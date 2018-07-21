export class auction{
    constructor(
    public name: string = '',
    public value: string = '',
    public wear: string = '',
    public inspectLink: Object = {},
    public timeRemaining: number = 0,
    public startDate: Object = {},
    public startHour: number = 0,
    public startMinutes: number = 0 ,
    public imageURL : string = '',
    public reserve: number = 0,
    public numToStart: number = 0,
    public bidCost : number = 0,
    public priceIncrease: number = 0,
    public isInInventory: Boolean = true,
    public opSkinsId: String = '',
    public assetid: number= 0 ,
    public contextid: number = 0,
    public appid: number = 0 ,
    public maxPrice: number = 0
    ){}
};