import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arregloTextoLineal'
})
export class ArregloTextoLinealPipe implements PipeTransform {

  transform(artistas: any[]): any {

    let valor = '';

    for (const artista of artistas) {

      valor = valor + artista.name + ', ';

    }

    return valor.substring(0, valor.length - 2);

  }

}
