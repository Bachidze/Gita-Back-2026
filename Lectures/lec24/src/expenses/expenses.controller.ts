import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesService:ExpensesService){}

    @Get()
    getAllExpenses(@Query() query){
        return this.expensesService.getAll(query)
    }

    @Get("/:id")
    getExpensesByID(@Param("id" , ParseIntPipe) id){
        return this.expensesService.getById(id)
    }


    @Post()
    createExpense(@Body() body,@Headers() headers){
        console.log(body)
        console.log(headers)
        return this.expensesService.create(body,headers)
    }


    @Delete("/:id")
    deleteExpenseById(@Param("id", ParseIntPipe) id){
       return this.expensesService.delete(id)
    }


    @Put("/:id")
    updateExpenseById( @Body() body,@Param("id", ParseIntPipe ) id){
        console.log(id)
        console.log(body)
        return this.expensesService.update(id,body)
    }


}

