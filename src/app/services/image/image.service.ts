import { Component, Injectable } from "@angular/core";
import { LoadingController, ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { catchError, finalize } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
// import { Upload } from "tus-js-client";
import { API_CONFIG } from "src/app/config/api.config";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public tus = false;
  public error: string | null = null;
  photo: SafeResourceUrl | null = null;
  private counter = 0;
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly loadingCtrl: LoadingController,
    private readonly toastCtrl: ToastController,
    // private globalService: GlobalService
  ) {}

   async uploadAll(webPath: string): Promise<void> {
    console.log("uploadAll");
    this.loading = await this.loadingCtrl.create({
      message: "Uploading...",
    });
    await this.loading.present();

    const blob = await fetch(webPath).then((r) => r.blob());

    const formData = new FormData();
    formData.append("file", blob, `file-${this.makeRandom()}.jpg`);
    this.http
      .post<boolean>(`${API_CONFIG.backendUrl}/uploadAll`, formData)
      .pipe(
        catchError((e) => this.handleError(e)),
        finalize(() => this.loading?.dismiss())
      )
      .subscribe((ok) => this.showToast(ok));
  }

  async uploadTus(webPath: string, imageName: string): Promise<void> {
    // this.loading = await this.loadingCtrl.create({
    //   message: "Uploading...",
    // });
    // await this.loading.present();

    const blob = await fetch(webPath).then((r) => r.blob());
    console.log("Blob", blob);
    // // const upload = new Upload(blob, {
    // //   endpoint: `${API_CONFIG.backendUrl}/upload`,
    // //   retryDelays: [0, 3000, 6000, 12000, 24000],
    // //   chunkSize: 512 * 1024,
    // //   metadata: {
    // //     filename: `${imageName}.jpg`,
    // //   },
    // //   onError: () => {
    // //     this.showToast(false);
    // //     this.loading?.dismiss();
    // //   },
    // //   onSuccess: () => {
    // //     this.showToast(true);
    // //     this.loading?.dismiss();
    // //   },
    // // });

    // upload.start();
  }

  private handleError(error: any): Observable<never> {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return throwError(errMsg);
  }

  private async showToast(ok: boolean): Promise<void> {
    if (ok) {
      const toast = await this.toastCtrl.create({
        message: "Upload successful",
        duration: 3000,
        position: "top",
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: "Upload failed",
        duration: 3000,
        position: "top",
      });
      toast.present();
    }
  }

  makeRandom() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
