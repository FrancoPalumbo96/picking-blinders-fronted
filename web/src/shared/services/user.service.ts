import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";

@Injectable()
export class UserService {

  private readonly usersUrl: string;
  private usersList: User[];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.usersUrl = environment.url + '/users';
  }

  private findAll(): Observable<User[]> {
    return this.http.get(this.usersUrl).pipe(
      map((res: any) => {
        this.usersList = res.map((user) => User.fromJsonObject(user));
        return this.usersList;
      }),
      catchError(() => {
        this.snackBar.open('Hubo un error al traer los usuarios.', '', {
          duration: 2000,
        });
        return this.users;
      })
    );
  }

  public save(user: User) {
    return this.http.post<User>(this.usersUrl + "/create", user).pipe(
      map((res: any) => {
        this.usersList = [...this.usersList, User.fromJsonObject(res)];
        this.snackBar.open('El usere fué guardado con éxito.', '', {
          duration: 2000,
        });
        return res;
      }),
      catchError(() => {
        this.snackBar.open('Hubo un error al guardar el usuario.', '', {
          duration: 2000,
        });
        return this.users;
      })
    );
  }

  public update(user: User) {
    return this.http.put<User>(this.usersUrl + "/update/" + user.id, user).pipe(
      map((res: User) => {
        let i = this.usersList.findIndex(c => c.id === user.id);
        let auxUsersList: User[] = [...this.usersList];
        auxUsersList[i] = res;
        this.usersList = [...auxUsersList];
        this.snackBar.open('El usuario fué actualizado con éxito.', '', {
          duration: 2000,
        });
        return res;
      }),
      catchError((response) => {
        this.snackBar.open(response?.error?.message, '', {
          duration: 2000,
        });
        return this.users;
      })
    );
  }

  get users(): Observable<User[]> {
    return this.usersList
      ? new Observable<User[]>((subscriber) =>
        subscriber.next(this.usersList)
      )
      : this.findAll();
  }

  public delete(user: User) {
    return this.http.delete<User>(this.usersUrl + "/" + user.id).pipe(
      map(() => {
        let auxUsersList: User[] = [...this.usersList];
        auxUsersList.splice(this.usersList.findIndex(c => c.id === user.id), 1);
        this.usersList = [...auxUsersList];
        this.snackBar.open('El usuario fue eliminado con éxito.', '', {
          duration: 2000,
        });
        return this.usersList;
      }),
      catchError(() => {
        this.snackBar.open('Hubo un error al eliminar el usuario.', '', {
          duration: 2000,
        });
        return this.users;
      })
    )
  }
}
