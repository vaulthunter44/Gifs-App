import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { splitClasses } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Gif, SearchGifsResponse }from "../interface/gifs.interface";

@Injectable({
  providedIn: 'root'
})
export class GifsService {




  private apikey:string="YYa3rthPOFPuP8fLNeJew381BwSjoZVN";
  private servicioUrl:string='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
  public resultados: Gif[]=[];


  constructor(private http:HttpClient) { 
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }



  get historial(){
   
    return [...this._historial];
  }

buscarGifs(query:string=' ')
{
  query=query.trim().toLowerCase();
  if (!this._historial.includes(query)) {
    this._historial.unshift( query );
    this._historial=this._historial.splice(0,10);
  }


  localStorage.setItem('historial',JSON.stringify(this._historial));

  console.log(this._historial);

const params= new HttpParams()
.set('apikey',this.apikey)
.set('limit','30')
.set('q',query);


  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
  .subscribe((resp:SearchGifsResponse)=>{
    console.log(resp.data);
    
    this.resultados=resp.data;
    localStorage.setItem('resultados',JSON.stringify(this.resultados));
  });

}



  
  
}
