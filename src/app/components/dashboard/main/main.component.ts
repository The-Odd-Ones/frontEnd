import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Chart from "chart.js";
import { HttpService } from "src/app/services/http/http.service";
import { NgForm } from "@angular/forms";

// @Component({
//   selector: "app-main",
//   templateUrl: "./main.component.html",
//   styleUrls: ["./main.component.scss"]
// })
// export class MainComponent implements OnInit {
//   constructor(private router: Router) {}
//   ngOnInit() {}
// }

@Component({
  selector: "app-dashboard",
  templateUrl: "main.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public datasets: any;
  public data: any;
  public labels: any;
  public myChartData;
  public communities: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public usersChart;
  public activityChart;
  public models;
  public documents;
  public indexes;
  public modelToBeModified;
  public activeAvg;
  public registerAvg;
  public  months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  constructor(private http: HttpService, private router :Router) {}
  
  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }
  getIndexes(model){
    this.modelToBeModified = model
    this.http.get(`/dashboard/models/${model.name}/indexes`).subscribe((data: any) => {
      if(data.success) this.indexes = data.result
    });
  }
  getDocuments(model){
    this.modelToBeModified = model
    this.http.get(`/dashboard/models/${model.name}/documents`).subscribe((data: any) => {
      if(data.success) this.documents = data.result
    });
  }


  getNotIndexes(model){
    this.modelToBeModified = model
    this.http.get(`/dashboard/models/${model.name}/notindexes`).subscribe((data: any) => {
      if(data.success) this.documents = data.result
    });
  }

  addIndex(document,i){
    this.http.post(`/dashboard/models/${this.modelToBeModified.name}/indexes` , {document}).subscribe((data: any) => {
      if(data.success) this.documents.splice(i,1)
    });
  }
  removeIndex(document,i){
    this.http.delete(`/dashboard/models/${this.modelToBeModified.name}/indexes/${document}`).subscribe((data: any) => {
      if(data.success) this.indexes.splice(i,1)
    });
  }
  ngOnInit() {
  
    this.http.get("/dashboard/models").subscribe((data: any) => {
      if(data.success) this.models = data.result
    });
    

    this.getCommunities();
    this.getPosts();
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(233,32,16,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76"
            }
          }
        ]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    };

    this.canvas = document.getElementById("chartLineRed");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    var data = {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      datasets: [
        {
          label: "Data",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#ec250d",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#ec250d",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ec250d",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [80, 100, 70, 80, 120, 80]
        }
      ]
    };

    var myChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    var data = {
      labels: ["JUL", "AUG", "SEP", "OCT", "NOV"],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00d6b4",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00d6b4",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [90, 27, 60, 12, 80]
        }
      ]
    };

    this.activityChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipGreen
    });

    var chart_labels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    this.datasets = [
      [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
      [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
      [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
    ];
    this.data = this.datasets[0];

    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    var config = {
      type: "line",
      data: {
        labels: chart_labels,
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#ec250d",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#ec250d",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#ec250d",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data
          }
        ]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);

    this.canvas = document.getElementById("CountryChart");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    this.usersChart = new Chart(this.ctx, {
      type: "bar",
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ["USA", "GER", "AUS", "UK", "RO", "BR"],
        datasets: [
          {
            label: "Users",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#1f8ef1",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [53, 20, 10, 80, 100, 45]
          }
        ]
      },
      options: gradientBarChartConfiguration
    });
    this.http.get('/dashboard/users').subscribe((data: Object) => {
     
      this.labels = data['result'].map(one => (new Date(one._id).getDate()))
      this.data = data['result'].map(one => one.users)
      this.registerAvg = this.data.reduce((one,acc)=>acc + one) / this.labels[this.labels.length-1] 
      this.updateOptions(this.usersChart, 'Users');
    })
    
  }
  public updateOptions(chart,labelName) {
    chart.data.datasets[0].data = this.data;
    chart.data.labels = this.labels;
    chart.data.datasets[0].label = labelName;
    chart.options.scales.yAxes[0].ticks.suggestedMax = Math.max(
      ...this.data
    );
    chart.options.scales.yAxes[0].ticks.suggestedMin = 0;

    chart.update();
  }
  communityActivity:any;
  activityData:Boolean = true;
  getActivities(community){
    this.http.get(`/dashboard/communities/${community._id}/activity`).subscribe((data: Object) => {
      this.communityActivity = community.name
      if(!data['result'].length){
        this.activityData = false
        return
      }
      this.activityData = true
      this.labels = data['result'].map(one => (this.months[new Date(one._id).getMonth()] + ' - ' + new Date(one._id).getDate()))
      this.data = data['result'].map(one => one.users)
      this.activeAvg = Math.floor(this.data.reduce((one,acc)=>acc + one) / this.data.length)
      this.updateOptions(this.activityChart, 'Users');
     
     })
  }

  getPosts() {
    this.http.get("/dashboard/posts").subscribe((data: Array<Object>) => {
      this.labels = data.map((one: any) => one._id.name);
      this.data = data.map((one: any) => one.posts);
      this.updateOptions(this.myChartData,'Posts');
    });
  }

  getLikes() {
    this.http.get("/dashboard/likes").subscribe((data: Array<Object>) => {
      this.labels = data.map((one: any) => one._id.name);
      this.data = data.map((one: any) => one.likes);
      this.updateOptions(this.myChartData,'Likes');
    });
  }

  getEvents() {
    this.http.get("/dashboard/events").subscribe((data: Array<Object>) => {
      this.labels = data.map((one: any) => one._id.name);
      this.data = data.map((one: any) => one.events);

      this.updateOptions(this.myChartData,'Events');
    });
  }
  getCommunities() {
    this.http.get("/dashboard/communities").subscribe(data => {
      this.communities = data["result"];
      this.getActivities( this.communities[0])
    });
  }

  createCommunity(form: NgForm) {
    this.http.post("/dashboard/createCommunity", form.value).subscribe(data => {
      this.communities.unshift(data["result"]);
    });
  }

  deactivate(community) {
    if (community.deactivated) {
      this.http.get(`/dashboard/communities/${community._id}/activate`).subscribe(data => {
        community.deactivated = false
      });
    }else{
      this.http
        .get(`/dashboard/communities/${community._id}/deactivate`)
        .subscribe(data => {
          community.deactivated = true
        });
      
    }

    
  }
}


 