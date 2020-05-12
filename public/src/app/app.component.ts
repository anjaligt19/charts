import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { Color, Label } from 'ng2-charts';
import {ChartService} from "./chart.service";
//@ViewChild(BaseChartDirective) chart;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  barChartLabels= [];
  bData = <any>[];
  
  constructor(private chartService: ChartService) { }
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
        display: false
    },
    scales: {
      xAxes: [
          {
              ticks: {
                fontSize: 8
              }
          }
      ],
      yAxes: [{
       ticks: {
          beginAtZero: true,
          
        }
      }]
    }
  };
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaledisplay:false,
    fill: true,
    legend: {
        display: false
    },
    scales: {
	    xAxes: [
	        {
	            display: false
	        }
	    ],
	    yAxes: [
	        {
	            display: false
	        }
	    ]
	},
	title: {
            display: true,
            text: ['Custom Chart Title one', 'Custom Chart Title two'],
            fontWeight: "bolder",
        fontColor: "#008B8B",
        fontFamily: "tahoma",        
        fontSize: 12,
        padding: 10 
        },
        plugins: {
            filler: {
                propagate: true
            }
        }
  };

  public orderChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaledisplay:false,
    fill: true,
    legend: {
        display: false
    },
    scales: {
      xAxes: [
          {
              display: false
          }
      ],
      yAxes: [
          {
              display: false
          }
      ]
  },
  title: {
            display: true,
            text: ['Custom Chart Title one', 'Custom Chart Title two'],
            fontWeight: "bolder",
        fontColor: "#008B8B",
        fontFamily: "tahoma",        
        
        fontSize: 12,
        padding: 10 
        },
        plugins: {
            filler: {
                propagate: true
            }
        }
  };
  
  public barChartType = 'bar';
  public barChartLegend = true;
  

  public barChartData : ChartDataSets[];

  public barChartColors: Color[] = [
    { backgroundColor: ['#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2','#2375af', '#3efbf2'] },
    
  ]

  public barChartColorsN: Array<any> = [
    { 
      backgroundColor: ['red', 'green']
    }
  ];

  public salesLineCData: ChartDataSets[];
  public salesLineLabel:Label[];

  public ordersLineCData: ChartDataSets[];
  public ordersLineLabel:Label[];

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartColors: Color[] = [
    {
      //borderColor: '#ccc',
      backgroundColor: '#d27c98',
    },
    
  ];
  public ordersChartColors: Color[] = [
    {
      backgroundColor: '#9d9cca'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  ngOnInit() {

    /**
      * @method : This method is used to get orders
      * per day for a product for the last two weeks
    */
    this.chartService.getCharts()
      .subscribe( (response:any) => {
        var data = response.data;
        this.barChartLabels = data.map(a => a.ProductID);
        this.barChartData = [
          { data: data.map(a => a.opd), label: 'products' },
        ];
      });

    /**
      * @method : This method is used to get sales
      *  variation
    */
      this.chartService.getSalesVariation().subscribe( (saleRes:any) => {
        var salesData = saleRes.data.salesVariation;
        this.salesLineLabel = salesData.map(a => a.date);
        this.lineChartOptions.title.display = true;
        this.lineChartOptions.title.text[0] = saleRes.data.totalPastSales;
        this.lineChartOptions.title.text[1] = saleRes.data.salesPercentage+" decrease sales amount";
        this.salesLineCData = [
                { data: salesData.map(a => a.daily_total), label: 'salesAmt' }
              ];
      });

      /**
        * @method : This method is used to get orders
        *  variation
      */
      this.chartService.getOrdersVariation().subscribe((ordersRes:any) => {
        var ordersData = ordersRes.data.orderVariation;
        this.ordersLineLabel = ordersData.map(a => a.date);
        this.orderChartOptions.title.display = true;
        this.orderChartOptions.title.text[0] = ordersRes.data.totalPastOrders;
        this.orderChartOptions.title.text[1] =ordersRes.data.ordersPercentage+" decrease orders amount";
        this.ordersLineCData = [
                { data: ordersData.map(a => a.num_orders), label: 'ordersCount' }
              ];
      });
  }
}

