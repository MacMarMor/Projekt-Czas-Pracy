const { defaultConfiguration } = require("express/lib/application");

class EmployeesScheduler {
    
    EMPLOYEE = new Array;
    MINIMUMSTAFF = new Array;

    JSON_EmployeeShift;

    constructor () {
        console.log("Im work!! bLah");
    }
    
    setSchedule(){ //startDate, endDate){
        if (this.EMPLOYEE.count() == 0) { //check Employees data is correct
//            this.updateEmployees();
			throw new Error('EMPLOYEE is empty!');
        }
        console.log("EMPLOYEE.count() "+this.EMPLOYEE.count());
        if (this.MINIMUMSTAFF.count() == 0) { //check MinimumStaff data is correct
//            this.updateMinimumStaff(startDate, endDate);
			throw new Error('MINIMUMSTAFF is empty!');
        }
        //check parameters startDate endDate is correct
        
        //while MinimumStaff > staffWorked at time
        for(var i = 0; this.MINIMUMSTAFF.count() > i; i++){
            while (this.getMinimumStaffAt(i) < getStaffWorkedAt(i)){
                //need 4h or 8h employee? -> shiftTime
                var shiftTime;
                for(j=0;j<7;j++){
                    if(this.getMinimumStaffAt(i+j) > 0)
                        shiftTime++;
                }
                
                if(shiftTime < 5) {//4h shift
                        while (true) {//get employee while employee shift != shiftTime
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
                }
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
		
		console.log("testEMPS json.stringify: "+JSON.stringify(json, null, 4));
//		console.log("json.id: "+json[0]._id);
		
		this.EMPLOYEE = json;
    }
    
    updateMinimumStaff(json){ // request db for employees list
        //grafik.json
		
        //JSON_EmployeeShift =
		this.MINIMUMSTAFF = json;
        console.log("testEMPS testminStaff: "+JSON.stringify(json, null, 4))
    }
    
    getMinimumStaffAt(time){ // from MINIMUMSTAFF get value
        return this.MINIMUMSTAFF[time];
    }
    
    getStaffWorkedAt(time){ // from MINIMUMSTAFF get value
        //
    }

    prepreJSON_EmployeeShift(employee){
         //grafik.json
    }

    prepreJSON_MinimumStaff(employee){
        
    }

    updateDB(text){ // request db for update list
       
    }
}

module.exports = EmployeesScheduler;