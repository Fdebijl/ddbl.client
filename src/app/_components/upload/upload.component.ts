import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StorageService} from '../../_services';
import { DataSet } from 'src/app/_domain/class';
import { ToastComponent } from '../toast/toast.component';
import { DataService } from 'src/app/_services/data.service';
import { MockXMLHttpRequest } from 'src/app/_util/MockXHR';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const UIkit: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  loading = false;
  uploadForm: FormGroup;
  thumbnail: FormData;
  thumbnailFileName: string;
  thumbnailFileSize: string;
  dataContent: FormData;
  dataContentFileName: string;
  dataContentFileSize: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private dataService: DataService) {
    return;
  }

  ngOnInit(): void {
    this.initDatasetUploader()
    this.initThumbnailUploader();

    this.uploadForm = this.formBuilder.group({
      dataTitle: ['', Validators.required],
      dataYear: ['', Validators.required],
      dataDesc: ['', Validators.required],
      dataAgeGroup: ['', Validators.required],
      dataCateg: ['', Validators.required],
      dataType: ['', Validators.required],
      dataFormat: ['', Validators.required],
      dataSource: ['', Validators.required],
      dataLink: ['', Validators.required],
      dataAccess: ['', Validators.required]
    });
    return;
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    if (!this.dataContent || !this.dataContent.get('file')) {
      ToastComponent.getInstance().error('Please upload a dataset!', 'Error');
      return;
    }

    if (!this.thumbnail || !this.thumbnail.get('file')) {
      ToastComponent.getInstance().error('Please upload a thumbnail!', 'Error');
      return;
    }

    const data = await this.formDataToString(this.dataContent);
    const format = (this.dataContent.get('file') as File).name.split('.').pop();

    if (format !== 'json') {
      ToastComponent.getInstance().error('VLL DataSystem currently only supports GeoJSON!', 'Error');
      return;
    }

    const dataSet = new DataSet({
      data,
      metaData: {
        title: this.f.dataTitle.value,
        description: this.f.dataDesc.value,
        year: this.f.dataYear.value,
        ageGroup: this.f.dataAgeGroup.value,
        contributorId: this.storageService.user.getValue().id,
        credit: this.f.dataSource.value,
        category: this.f.dataCateg.value,
        source: this.f.dataSource.value,
        linkToSource: new URL(this.f.dataLink.value),
        publik: this.f.dataAccess.value === 'public',
        pathToThumbnail: 'tbd',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    // Upload dataset
    const createdDataSetId = await this.dataService.create(dataSet);

    // Upload thumbnail
    await this.dataService.uploadThumbnail(this.thumbnail, createdDataSetId);

    // Redirect to newly created visualization
    this.loading = false;
    ToastComponent.getInstance().success('Your dataset was uploaded succesfully! You will be redirected shortly.', 'Upload successful');
    setTimeout(() => {
      this.router.navigate([`/`])
    }, 5000)
    return;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.uploadForm.controls;
  }

  private initThumbnailUploader(): void {
    UIkit.upload('.thumbnail-upload', {
      url: '',
      name: 'file',
      multiple: false,
      mime: 'image/*',
      beforeSend: (environment) => {
        this.thumbnail = environment.data;
        this.thumbnailFileName = (this.thumbnail.get('file') as File).name;
        this.thumbnailFileSize = `${((this.thumbnail.get('file') as File).size / 1000 / 1000).toFixed(2)}MB`;
      }
    });
  }

  private initDatasetUploader(): void {
    UIkit.upload('.dataset-upload', {
      url: '',
      name: 'file',
      multiple: false,
      allow: '*.json',
      beforeSend: (environment) => {
        this.dataContent = environment.data;
        this.dataContentFileName = (this.dataContent.get('file') as File).name;
        this.dataContentFileSize = `${((this.dataContent.get('file') as File).size / 1000 ).toFixed(2)}KB`;
        environment.xhr = new MockXMLHttpRequest();
        return environment;
      },
      error: (error) => {
        console.log(error);
      }
    });

    document.querySelector('.dataset-upload').addEventListener('upload', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    });
  }

  private async formDataToString(dataFile: FormData): Promise<string> {
    const file = dataFile.get('file') as File;
    const content = await file.text();
    return content;
  }

  enterTestData(): void {
    this.uploadForm.controls.dataTitle.setValue('Testtitel');
    this.uploadForm.controls.dataDesc.setValue('Testbeschrijving')
    this.uploadForm.controls.dataYear.setValue('2010')
    this.uploadForm.controls.dataAgeGroup.setValue('12-18')
    this.uploadForm.controls.dataSource.setValue('KNMI');
    this.uploadForm.controls.dataCateg.setValue('Health')
    this.uploadForm.controls.dataLink.setValue('https://www.knmi.nl/')
    this.uploadForm.controls.dataAccess.setValue('public');
  }
}
