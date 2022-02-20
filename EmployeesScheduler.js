const { defaultConfiguration } = require("express/lib/application");

class EmployeesScheduler {
    
    EMPLOYEE = new Array;
    MINIMUMSTAFF = new Array;
    Employee_Scheduled =  MINIMUMSTAFF;

    JSON_EmployeeShift;

    constructor () {
        console.log("Im work!! bLah");
    }
    
    setSchedule(){ //startDate, endDate){
        console.log("I'm in setSchedule: "+ this.EMPLOYEE.length +" "+this.MINIMUMSTAFF.length)
        if (this.EMPLOYEE.length == 0) { //check Employees data is correct
//            this.updateEmployees();
			//throw new Error('EMPLOYEE is empty!');
            console.log("Employee is empty");
        }

        //console.log("EMPLOYEE.count() "+this.EMPLOYEE.count());
        if (this.MINIMUMSTAFF.length == 0) { 
            //check MinimumStaff data is correct
//            this.updateMinimumStaff(startDate, endDate);
			//throw new Error('MINIMUMSTAFF is empty!');
            console.log("MINIMUMSTAFF is empty");
        }

        //check parameters startDate endDate is correct

        /*for (var i = 0; i<this.MINIMUMSTAFF.length; i++)
        {
            console.log("JESTEM W PETLI")
            console.log("minimum staff = "+this.getMinimumStaffAt(i));
            this.getStaffWorkedAt(i);
        }*/

        
        //while MinimumStaff > staffWorked at time
        for(var i = 0; this.MINIMUMSTAFF.length > i; i++){ //MINIMUMSTAFF -> [5 4 4 2 2 2 2 3 5 6 8 8 9 11 18 19 15]
            while (this.getMinimumStaffAt(i) > this.getStaffWorkedAt(i)){ //czy ktoś już jest zagrafikowany
                //console.log("minimumstaff = "+this.getMinimumStaffAt(i));
                //console.log("worked staff = "+this.getStaffWorkedAt(i));
                //need 4h or 8h employee? -> shiftTime
                var shiftTime;
                for(j=0;j<7;j++){ //sprawdzamy czy potrzebujemy kogos na 4 czy 8h. [1 1 1 0 0 0 1 0] => 4h /// [1 1 1 0 1 1 1 1] => 8h
                    if(this.getMinimumStaffAt(i+j) - getStaffWorkedAt(i+j)> 0) //TODO: tutaj nie > 0 tylko  > this.getMinimumStaffAt(i+j) - getStaffWorkedAt(i+j)
						//czyli sprawdzamy czy jest jeszcze zapotrzebowanie
                        shiftTime++;
                }
				
                while(true)
                {
                    if (shiftTime < 5)
                    {
                        var j = 0;
					    while (true) {//get employee while employee shift != shiftTime TODO: zmienić pętle
                        if(this.EMPLOYEE[j].staz == 4){
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);
                            this.prepreJSON_MinimumStaff(this.EMPLOYEE[j], i);
                        }
                        else
                            j++;
                        }
                    }
                    else
                    {
                        var j = 0;
					    while (true) {//get employee while employee shift != shiftTime TODO: zmienić pętle
                        if(this.EMPLOYEE[j].staz == 4){
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);
                            this.prepreJSON_MinimumStaff(this.EMPLOYEE[j], i);
                        }
                        else
                            j++;
                        }
                    }
                
                }

                /*if(shiftTime < 5) {//4h shift
					var j = 0;
					while (true) {//get employee while employee shift != shiftTime TODO: zmienić pętle
                        if(this.EMPLOYEE[j].shiftDuration == 4){
                            //make JSON for employee shift
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);
                            //make JSON for MinimumStaff ('grafik')
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);
                        }
                        else
                            j++;
                    }
                    }
                else {// 8h shift
					var j = 0;
                    while (true) {//get employee while employee shift != shiftTime
                        if(this.EMPLOYEE[j].shiftDuration == 8){
                            //make JSON for employee shift
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);  //grafik.json
                            //make JSON for MinimumStaff ('grafik')
                            this.prepreJSON_MinimumStaff(this.EMPLOYEE[j]);
                        }
                        else
                            j++;
                    }
                }*/
            }
        }
    }

    setMonth(month){
        //get current year
        //startDate = year,month,01,00:00
        //endDate = year,month+1,1,00:00
        this.setSchedule(startDate,endDate)
    }

    setDay(day, month='optional'){
        //get current year, month
        //startDate = year,month,day,00:00
        //endDate = year,month,day+1,00:00
        this.setSchedule(startDate,endDate)
    }
    
    updateEmployees(json){ // request db for employees list
        //lista_pracownikow.json
		
		//console.log("testEMPS json.stringify: "+JSON.stringify(json, null, 4));
		//console.log("json.id: "+json[0]._id);

        //console.log(typeof(json))
        var obj = JSON.parse(JSON.stringify(json));

        //new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)
        //var date = new Date(obj[0].dniPracy[0].startPracy.date.year, obj[0].dniPracy[0].startPracy.date.month, obj[0].dniPracy[0].startPracy.date.day)
        //console.log("obj = "+date);
		//console.log(Array.from(obj))
    
		this.EMPLOYEE = Array.from(obj);
        //console.log(this.EMPLOYEE)
    }
    
    updateMinimumStaff(json){ // request db for employees list
        //grafik.json
		
        //JSON_EmployeeShift =

        var obj = JSON.parse(JSON.stringify(json));

        console.log("upadte mininum staff = "+obj[0].grafik["2022-02-19"].dane);

        this.MINIMUMSTAFF = obj[0].grafik["2022-02-19"].dane;
        console.log(this.MINIMUMSTAFF.length);

        
		//this.MINIMUMSTAFF = JSON.parse(JSON.stringify(json))[0]; // musi zwrócić tablice 24-elementową z dnia aktualnego
        //console.log("testEMPS testminStaff: "+JSON.stringify(json, null, 4))

        //this.MINIMUMSTAFF = json;
    }
    
    getMinimumStaffAt(time){ // from MINIMUMSTAFF get value
        return this.MINIMUMSTAFF[time].iloscOsob;
    }
    
    getStaffWorkedAt(time){ // from MINIMUMSTAFF get value
        // [0 0 0 0 0 0 0 0]
        //console.log(this.MINIMUMSTAFF[time].pracownicy.length);
        return this.MINIMUMSTAFF[time].pracownicy.length;
    }

    prepreJSON_EmployeeShift(employee, i){
         //grafik.json
		
		//zapisać do nowej tablicy this.Employee_Scheduled


        this.employee.append("2022-01-19", staz);
        this.Employee_Scheduled.append(i, employee);
    }

    prepreJSON_MinimumStaff(employee, hour){
        for (var j = hour; j < hour+employee.staz; j++)
        {
            this.MINIMUMSTAFF[j].iloscOsob = this.MINIMUMSTAFF[i].iloscOsob--;
            this.MINIMUMSTAFF[j].pracownicy.append(employee);
        }
    }

    getEmployee_Scheduled(){
        return this.Employee_Scheduled;
    }

    updateDB(text){ // request db for update list
       
    }
}

module.exports = EmployeesScheduler;