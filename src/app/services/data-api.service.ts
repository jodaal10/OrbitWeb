import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../config/api';
import { response } from '../models/response';
import { student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }
  
  CreateStudent(_student: student){    
    return this
      .http.post<response>(`${environment.apiURL}${Endpoint.CreateStudent}`, _student)
      .pipe(map(data => data));
  }

  ModifyStudent(_student: student){    
    return this
      .http.post<response>(`${environment.apiURL}${Endpoint.ModifyStudent}`, _student)
      .pipe(map(data => data));
  }

  GetallStudents(){
    return this
    .http.get<Array<student>>(`${environment.apiURL}${Endpoint.GetAllStudents}`)
    .pipe(map(data => data));
  }

  DeleteStudent(IdStudent: number){    
    return this
      .http.get<response>(`${environment.apiURL}${Endpoint.DeleteStudent}${IdStudent}`)
      .pipe(map(data => data));
  }


}
