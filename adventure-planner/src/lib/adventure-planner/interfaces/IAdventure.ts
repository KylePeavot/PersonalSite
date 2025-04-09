export interface IAdventurePoint {
    startTime: Date,
    endTime: Date,
    coordinates: {
        lng: number,
        lat: number
    }
}

export interface IAdventure {
    id: string,
    name: string,
    //This is each "stop" in the adventure so arriving at a hotel, going to a restaurant, etc.
    adventurePoints: IAdventurePoint[]
}