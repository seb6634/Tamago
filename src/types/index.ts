import {MouseEventHandler} from "react";

export type User = {
    id: number,
    email: string,
    pseudo: string,
    startnight: string,
    endnight: string
}

export type TamagoScreenType = {
    emotion:string,
    tamagoEmotions: string[]
    poops: {locationX:number, locationY:number}[],
    light:boolean,
    type: string
    action:MouseEventHandler
}

export type Poops = {
    locationX:number,
    locationY:number
}

export type TamagoType = {
    id:number,
    name:"duck" | "rabbit" | "cat"
}

export type Tamagotchi = {
    id: number,
    name: string,
    age: number,
    health: number,
    energy: number,
    cleanliness: number,
    happiness: number,
    satiety: number,
    status: number,
    type: TamagoType
    createdAt: string,
    updatedAt: string,
    user?: User,
}

export type Food = {
    id: string,
    name: string,
    health: number,
    energy: number,
    cleanlines: number,
    happiness: number,
    satiety: number,
}


export type Type = {
    id: string,
    name: string,
    health: number,
    energy: number,
    cleanlines: number,
    happiness: number,
    satiety: number,
}


export type StatButtonProperty = {
    action:string;
    allTimeDisabled?:boolean;
    icon:string;
    value:number;
  }

export type TamagoEmotions = ["idle" | "no" | "sleep" | "eat" | "unhappy" | "wash" | "play" | "care"]

export type Nullable<T> = T | null;
