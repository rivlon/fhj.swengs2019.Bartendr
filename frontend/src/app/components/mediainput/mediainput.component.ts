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
  accept: string;
  medias: IMedia[];
  uploader: FileUploader;
  previews: Array<String> = [];
  isAdmin: Boolean;
  onChange = (medias: IMedia[]) => {
    // empty default
  }

  constructor(private authService: AuthService, private http: HttpClient, elm: ElementRef) {
    this.name = elm.nativeElement.getAttribute('name');
    if (this.name === 'pictures') {
      this.accept = 'image/*';
    } else {
      this.accept = '*';
    }
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
    if (this.isAdmin) {
      this.uploader = new FileUploader({
        url: this.resourceUrl,
        authToken: 'Bearer ' + localStorage.getItem(this.authService.accessTokenLocalStorageKey),
        autoUpload: true
      });
      this.uploader.onBeforeUploadItem = (item: FileItem) => {
        if (!this.medias) {
          this.medias = [];
        }
        this.medias.push({
          contentType: item.file.type,
          originalFileName: item.file.name,
          size: item.file.size
        });
      };
      this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
        const uploadedMedia = <IMedia>JSON.parse(response);
        this.medias.find(media => !media.id && media.originalFileName === uploadedMedia.originalFileName).id = uploadedMedia.id;
        this.initPreviews();
      };
      this.uploader.onCompleteAll = () => {
        this.onChange(this.medias);
      };
    }
  }

  deleteMedia(index: number): void {
    if (this.isAdmin) {
      this.medias.splice(index, 1);
      this.onChange(this.medias);
    }
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
    this.medias = obj;
    this.onChange(obj);
    this.initPreviews();
  }

  initPreviews() {
    if (this.medias) {
      this.medias.forEach((media, index) => {
        if (media.id && !this.previews[index]) {
          this.http.get(`${this.resourceUrl}/${media.id}`, {responseType:
              'blob'}).subscribe((blob: Blob) => {
            const fileURL = URL.createObjectURL(blob);
            this.previews[index] = fileURL;
          });
        }
      });
    }
  }

}
