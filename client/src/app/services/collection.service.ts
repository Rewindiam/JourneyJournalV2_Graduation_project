import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ICollection } from "../types/collection.interface";




@Injectable({
    providedIn: 'root',
})


export class CollectionService {

    collectionsSig = signal<ICollection[]>([]) // обновление

    constructor(
        private readonly http: HttpClient,
        private readonly toastr: ToastrService) {}

    findAll() {
        return this.http
            .get<ICollection[]>('collection')
            .subscribe((collections: ICollection[]) => {
                this.collectionsSig.set([...collections])
        })
    }

    // Создание поездки
    create(title: string) {
        return this.http
            .post<ICollection>('collection', { title })
            .subscribe((newCollection: ICollection) => {
                this.collectionsSig.update( (collections) => [...collections , newCollection] )
                this.toastr.success('created')
            })
    }


    
        update(id: number, title: string) {
            this.http.patch(`collections/collection/${id}`, { title }).subscribe(() => {
                this.collectionsSig.update((collections) =>
                    collections.map((ctg) =>
                        ctg.id === id ? { ...ctg, title } : ctg
                    )
                    
                )
                this.toastr.success('updated')
            })
        }



    delete(id: number) {
        return this.http.delete(`collections/collection/${id}`).subscribe(() => {
          this.collectionsSig.update((collections) => 
              collections.filter((collection) => collection.id === id)
        )
        this.toastr.success('deleted')
         })
    }


    
}