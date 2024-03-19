import React from "react";
import Event from './Event';

const Calendar = () => {
    return (
        <div className = "Calendar">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>

                <tr>
                <td className="time">8 am</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">9 am</td>
                <td></td>
                <Event event= "Tech4Good" color = 'green' location = 'S&E'/> 
                <td></td>
                <Event event= "Tech4Good" color = 'green' location = 'S&E'/> 
                <td></td>
                <Event event= "Tech4Good" color = 'green' location = 'S&E'/> 
                <td></td>
                </tr>

                <tr>
                <td className="time">10 am</td>
                <td></td>
                <Event event= "" color = 'green' location = ''/> 
                <td></td>
                <Event event= "" color = 'green' location = ''/> 
                <td></td>
                <Event event= "" color = 'green' location = ''/> 
                <Event event= "Web 102" color = 'green' location = 'Zoom'/> 
                </tr>

                <tr>
                <td className="time">11 am</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <Event event= "" color = 'green' location = ''/> 
                </tr>

                <tr>
                <td className="time">12 pm</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">1 pm</td>
                <Event event= "GDSC Meeting" color = 'orange' location = 'S&E'/> 
                <td></td>
                <Event event= "CMPM 177" color = 'blue' location = 'Baskin Engineering'/> 
                <td></td>
                <Event event= "CMPM 177" color = 'blue' location = 'Baskin Engineering'/> 
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">2 pm</td>
                <td></td>
                <Event event= "CSE 130" color = 'pink' location = 'Cowell Auditorium'/> 
                <Event event= "" color = 'blue' location = ''/> 
                <Event event= "CSE 130" color = 'pink' location = 'Cowell Auditorium'/> 
                <Event event= "" color = 'blue' location = ''/> 
                <Event event= "CSE 130" color = 'pink' location = 'Cowell Auditorium'/> 
                <td></td>
                </tr>

                <tr>
                <td className="time">3 pm</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">4 pm</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">5 pm</td>
                <td></td>
                <td></td>
                <Event event= "PSYC 121" color = 'orange' location = 'Stevenson 101'/> 
                <td></td>
                <Event event= "PSYC 121" color = 'orange' location = 'Stevenson 101'/> 
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">6 pm</td>
                <td></td>
                <td></td>
                <Event event= "" color = 'orange' location = ''/> 
                <td></td>
                <Event event= "" color = 'orange' location = ''/> 
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">7 pm</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>

                <tr>
                <td className="time">8 pm</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <Event event= "ASGN 3 DUE" color = 'red' location = 'Canvas'/> 
                <td></td>
                <td></td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

export default Calendar;