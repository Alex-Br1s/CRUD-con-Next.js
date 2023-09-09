import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export async function GET(request, {params}) {
    const {id} = params
    console.log(id);
    const idTask = await prisma.task.findUnique({
        where :{
            id: Number(id)
        }
    })
    return NextResponse.json(idTask)
}

export async function PUT(req, {params}) {
    const data = await req.json()
    const {id} = params
    const dataUpdate = await prisma.task.update({
        where:{
            id: Number(id)
        },
        data: data//? data: data por que lo que viene de data es igual a lo que quiero actualizar
    })
    return NextResponse.json(dataUpdate)
}

export async function DELETE(request, {params}) {
    try {
        const {id} = params
        const deleteTask = await prisma.task.delete({
            where:{
                id: Number(id),
            }
        })
        return NextResponse.json(deleteTask)
    } catch (error) {
        return NextResponse.json({error: error.message})
    }
}