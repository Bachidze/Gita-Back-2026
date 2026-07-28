import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IExpenses } from './DTO/expenses.dto';
import { IHeader } from './DTO/headers.dto';

@Injectable()
export class ExpensesService {

     expenses = [
        {
            id:1,
            category:"shopping",
            price:200
        },
        {
            id:2,
            category:"sport",
            price:300
        },
        {
            id:3,
            category:"shopping",
            price:300
        },
        {
            id:4,
            category:"tech",
            price:700
        },
    ]

    getAll(query:IExpenses){

        const {id,category,price} = query

        let data = this.expenses

        if(id) data = data.filter((el) => el.id === Number(id))

            if(price) data = data.filter((el) => el.price === Number(price))

                if(category) data = data.filter((el) => el.category === category)   

                    return data
    }


    getById(id:number){
        const expensesById = this.expenses.find(el => el.id === id)
        if(!expensesById) throw new BadRequestException()
        return expensesById
    }

    create(body:IExpenses,headers:IHeader){
        if(!headers || headers.password !== "12345") throw new  BadRequestException()
        
            const lastId = this.expenses[this.expenses.length - 1]?.id || 0
            const newExpense = {
                id:lastId + 1,
                category:body.category,
                price:body.price
            }            

            this.expenses.push(newExpense)

            return newExpense
    }


    delete(id:number){
        const index  = this.expenses.findIndex(el => el.id === id)
        if(index === -1) throw new NotFoundException()
            let deletedExpense = this.expenses.splice(index,1)

        return deletedExpense

    }


    update(id:number,body:IExpenses){
        const index  = this.expenses.findIndex(el => el.id === id)
        console.log(index)
        if(index === -1) throw new NotFoundException()

        this.expenses[index] = {
            ...this.expenses[index],
            category : body.category ?? this.expenses[index].category,
            price:body.price ?? this.expenses[index].price 
        }
        
        return this.expenses[index]
    }


}
