import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AbstractDataProviderService} from '../../../core/service/abstract-data-provider.service';
import {mapTo, tap} from 'rxjs/operators';
import produce from 'immer';
import {User} from '../../../shared/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractDataProviderService {

  private _users: User[];
  private users$: Subject<User[]> = new ReplaySubject(1);
  public readonly users: Observable<User[]> = this.users$.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  private fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/admin/users`);
  }

  protected destroy(): void {
    this.setUsers(null);
  }

  private setUsers(users: User[]) {
    this._users = users;
    this.users$.next(users);
  }

  protected init(): void {
    this.fetchUsers()
      .subscribe((users: User[]) => {
        this.setUsers(users);
        this.setDataIsInit();
      });
  }

  public createCaretaker(email: string, firstName: string, lastName: string): Observable<boolean> {
    return this.http.post<User>(`/admin/caretaker`, {email, firstName, lastName})
      .pipe(
        tap(this.addNewUser),
        mapTo(true),
        //
      );
  }

  private addNewUser = (user: User) => {
    this.setUsers(produce<User[]>(this._users, (draft: User[]) => {
      draft.unshift(user);
    }));
  };
}
