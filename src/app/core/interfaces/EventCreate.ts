export class Event {

     constructor(     
        public idevent: string,     
        public place: string,
        public name: string,
        public address: string,
        public init_date: string,
        public end_date: string,
        public user: any,
        public category: any,
        public event_type:any,
        public date_audit:string
     ) { }
}
