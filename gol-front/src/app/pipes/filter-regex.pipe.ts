import { Pipe, PipeTransform } from '@angular/core';
import {Point} from "../models/point";

@Pipe({
  name: 'filterRegex'
})
export class FilterRegexPipe implements PipeTransform {

  transform(value: Template[], arg: string): Template[] {
    if(!arg) return value
    return value.filter((item)=>item.name.match(arg));
  }

}

class Template{
  name:string=""
  pattern:Point[]=[]
  owner:string=""
  image:string=""
}
