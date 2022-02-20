const { defaultConfiguration } = require("express/lib/application");

class startPracy
{
    constructor(date, time, iloscPrzepracowanychGodzin)
    {
        this.date = date;
        this.time = time;
        this.iloscPrzepracowanychGodzin = iloscPrzepracowanychGodzin;
    }
}

class date
{
    constructor(year, month, day)
    {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

class time
{
    constructor(hour, minute, second, nano)
    {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.nano = nano;
    }
}

class EmployeesScheduler {
    
    EMPLOYEE = new Array;
    MINIMUMSTAFF = new Array;
    Employee_Scheduled =  this.MINIMUMSTAFF;

    numberOfMissingEmployees = new Array;

    JSON_EmployeeShift;

    constructor () {
        console.log("Im work!! bLah");
    }
    
    setSchedule(){ //startDate, endDate){
        console.log("I'm in setSchedule: "+ this.EMPLOYEE.length +" "+this.MINIMUMSTAFF.length)
        if (this.EMPLOYEE.length == 0) {
			//throw new Error('EMPLOYEE is empty!');
            console.log("Employee is empty");
        }
        if (this.MINIMUMSTAFF.length == 0) { 
			//throw new Error('MINIMUMSTAFF is empty!');
            console.log("MINIMUMSTAFF is empty");
        }

        //check parameters startDate endDate is correct
        
        //while MinimumStaff > staffWorked at time
        for(var i = 0; this.MINIMUMSTAFF.length > i; i++)
        { 
            while (this.getMinimumStaffAt(i) > this.getStaffWorkedAt(i)){
  
                var shiftTime = 0;
                for(j=0;j<7;j++)
                { 
                    //sprawdzamy czy potrzebujemy kogos na 4 czy 8h. [1 1 1 0 0 0 1 0] => 4h /// [1 1 1 0 1 1 1 1] => 8h
                    if(this.getMinimumStaffAt(i+j) - this.getStaffWorkedAt(i+j)> 0) //TODO: tutaj nie > 0 tylko  > this.getMinimumStaffAt(i+j) - getStaffWorkedAt(i+j)
                        shiftTime++;
                }
                var j = 0;

                while(j < this.EMPLOYEE.length) // i < Employee.length//get employee while employee shift != shiftTime TODO: zmienić pętle
                {
                    if (shiftTime < 5)
                    {
                        if(this.EMPLOYEE[j].staz == 4)
                        {
                            //console.log(this.EMPLOYEE[i]);
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j], i);
                            //this.prepreJSON_MinimumStaff(this.EMPLOYEE[j], i);
                            break;
                        }
                        else
                        {
                            j++;
                        }
                    }
                    else
                    {
                        if(this.EMPLOYEE[j].staz == 8)
                        {
                            this.prepreJSON_EmployeeShift(this.EMPLOYEE[j]);
                            //this.prepreJSON_MinimumStaff(this.EMPLOYEE[j], i);
                            break;
                        }
                        else
                        {
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

        var obj = JSON.parse(JSON.stringify(json));

        console.log("upadte mininum staff = "+obj[0].grafik["2022-02-19"].dane);

        this.MINIMUMSTAFF = obj[0].grafik["2022-02-19"].dane;
        console.log(this.MINIMUMSTAFF.length);
    }
    
    getMinimumStaffAt(time){ // from MINIMUMSTAFF get value
        return this.MINIMUMSTAFF[time].iloscOsob;
    }
    
    getStaffWorkedAt(time){ 
        return this.MINIMUMSTAFF[time].pracownicy.length;
    }

    prepreJSON_EmployeeShift(employee, i)
    {
        var sp = new startPracy(new startPracy(new date(2022, 2, 19), new time(i, 0, 0)), employee.staz)
        //console.log("EmployeeShift = "+employee);
        employee.dniPracy.push(sp);
        //this.Employee_Scheduled.push(i, employee);
    }

    prepreJSON_MinimumStaff(employee, hour)
    {
        for (var j = hour; j < hour+employee.staz-1; j++)
        {
            //this.MINIMUMSTAFF[j].iloscOsob = (this.MINIMUMSTAFF[j].iloscOsob)-1;
            //console.log(this.MINIMUMSTAFF[j].iloscOsob);
            //this.MINIMUMSTAFF[j].pracownicy.push(employee);
        }
    }

    getEmployee_Scheduled()
    {
        return this.Employee_Scheduled;
    }

    updateDB(text){ // request db for update list
       
    }
}

module.exports = EmployeesScheduler;