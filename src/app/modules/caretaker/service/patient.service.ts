import {Injectable} from '@angular/core';
import {User} from '../../../shared/interface/user.interface';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {mapTo} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patients: User[];
  private patients$: Subject<User[]> = new ReplaySubject(1);
  public readonly patients: Observable<User[]> = this.patients$.asObservable();

  constructor(private http: HttpClient) {
  }

  public createPatient(email: string, firstName: string, lastName: string): Observable<boolean> {
    return this.http.post<User>(`/caretaker/patients`, {email, firstName, lastName})
      .pipe(
        mapTo(true)
      );
  }

}
