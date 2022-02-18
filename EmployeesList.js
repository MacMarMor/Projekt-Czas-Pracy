class EmployeesList
{
    constructor(id, name, surname, email, address, workDays, daysOff)
    {
        this.id = id;
        this.imie = imie;
        this.surname = surname;
        this.email = email;
        this.address = address;
        this.workDays = workDays;
        this.daysOff = daysOff;
    }
}

class Date
{
    constructor(year, month, day)
    {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}

class Time
{
    constructor(hour, minute, second, nano)
    {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.nano = nano;
    }
}

class workDays
{
    constructor(startDate, startTime, workHours)
    {
        this.startDate = startDate;
        this.startTime = startTime;
        this.workHours = workHours;
    }
}

class daysOff
{
    constructor(startDate, startTime, endDate, endTime, cause)
    {
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.cause = cause
    }
}