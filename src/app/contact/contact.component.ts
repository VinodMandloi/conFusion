import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { visibility,flyInOut,expand} from '../animations/app-animations';
import { FeedbackService } from '../services/feedback.service';
import { delay } from 'q';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
      visibility(),
    ]
})

export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  feedbackForm: FormGroup;
  feedback= new Feedback();
  contactType = ContactType;
  feedbackcopy: Feedback=null;
  errMess: string;
  spinnerVisibility: boolean = false;
  detailVisibility: boolean = false;

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25) ]] ,
      lastname: ['',  [Validators.required , Validators.minLength(2) , Validators.maxLength(25) ] ],
      telnum: [0, [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.spinnerVisibility = true;
    this.feedbackcopy = this.feedbackForm.value;

    this.feedbackService.putFeedback(this.feedbackcopy)
      .subscribe(feedback => {
        this.feedback = feedback; this.feedbackcopy = feedback;
      },
      errmess => { this.feedback = null; this.feedbackcopy = null; this.errMess = <any>errmess; });

      this.spinnerVisibility=true;
      setTimeout( () => {this.spinnerVisibility=false;
        this.detailVisibility = true; }, 2000 );
      setTimeout( () => { this.detailVisibility=false; }, 5000 );


      
    console.log(this.feedbackcopy);
    this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      });
      this.feedbackFormDirective.resetForm();
  }

}
