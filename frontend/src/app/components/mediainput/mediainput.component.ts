import {Component, ElementRef, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../service/auth.service';

export interface IMedia {
  id?: number;
  originalFileName?: string;
  contentType?: string;
  size?: number;
}

@Component({
  selector: 'app-mediainput',
  templateUrl: './mediainput.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediainputComponent),
      multi: true
    }
  ]
})
export class MediainputComponent implements OnInit, ControlValueAccessor {
  resourceUrl = '/api/media';
  name: string;
  medium: IMedia;
  uploader: FileUploader;
  preview: string;
  pictureId?: number;

  onChange = (medium: IMedia) => {
    // empty default
  };

  constructor(private authService: AuthService, private http: HttpClient, elm: ElementRef) {
    this.name = elm.nativeElement.getAttribute('name');
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.resourceUrl,
      authToken: 'Bearer ' + localStorage.getItem(this.authService.accessTokenLocalStorageKey),
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      if (!this.medium) {
        this.medium = null;
      } else {
        this.medium.contentType = item.file.type;
        this.medium.originalFileName = item.file.name;
        this.medium.size = item.file.size;
      }
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = <IMedia>JSON.parse(response);
      this.pictureId = uploadedMedia.id;
      this.initPreview();
    };
    this.uploader.onCompleteAll = () => {
      this.onChange(this.medium);
    };
  }

  deleteMedium(id: number): void {
    this.onChange(this.medium);
  }

  downloadMedia(media: IMedia): void {
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const a = <HTMLAnchorElement>document.createElement('a');
      a.href = fileURL;
      a.download = media.originalFileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // not implemented
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  writeValue(obj: any): void {
    this.medium = obj;
    this.onChange(obj);
    this.initPreview();
  }

  initPreview() {
    if (this.medium && this.medium.id) {
      this.http.get(`${this.resourceUrl}/${this.pictureId}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        this.preview = fileURL;
      });
    }
  }
}
