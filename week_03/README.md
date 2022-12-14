# WEEK 3: 

Yifu Hou </p>
CAPP 30239 </p>

## The repository contains following files:

* **index.html:** Example HTML document from class.
* **script.js:** Example js file for data visualization from class.
* **covid.csv:** Example data from class (COVID cases in different countries).

</p>

* **homework.html:** HTML file for homework.
* **homework.js:** js file for homework (build data visualization on library vist data).
* **lib.csv:** Library visit data for homework.

</p>

* **chicago_complaints.csv:** Imported data from Chicago Data Portal (for final project). ***See detailed description below.***


* **README.md:** This file.


## Data Source: CDPH Environmental Complaints

### Data source
Title: CDPH Environmental Complaints  </p>
Agency: the Department of Environment (DOE)  </p>
Location: Chicago, IL </p>
Link: https://data.cityofchicago.org/Environment-Sustainable-Development/CDPH-Environmental-Complaints/fypr-ksnz </p>

### About the data

#### 1) Description:

This database contains environmental complaints received by the Department of Environment (DOE) and the Department of Public Health (CDPH). The most recent update of this database is on October 12, 2022. 
The database has in total 56,191 records about environment conplaints in the City of Chicago in the past over 30 years. Most frequent complaints include noice, air pollution, illegal dumping, etc. 
The record keeps good geographical data (coordinates, address and neighborhood) and time data (time of complaint), which should be a good source of visualization.

#### 2) Interest:

I found this database while I was searching for inspirations on Chicago Data Portal. I'm always interested in civic data, and the environmental complaints seemed to be an interesting topic to investigate. The dataset is huge and well-documented, and I would love to see how the general environment complaints data will look like as data visualization. 

#### 3) Utilization:

I would like to categorize the data to reduce complexity and discover information or stories. For example, group the data by complaint categories, neighborhoods, time of a day (morning, afternoon, night), year, etc. By creating these categorical data, the visualization should be able to capture some patterns. Another thing that's worth noticing is that the data also contains a detailed description of the complaint, which is a short English text. If conditions permit, this information might be able to present the general topics of complaints with some language processing.

#### 4) Potential data points

**INDEX:** < int > index</p>
**COMPLAINT_TYPE:** < char > types of complaint</p>
**TIME_OF_THE_DAY:** < char > needs to be built based on time from original data source</p>
**NEIGHBORHOOD:** < char > community area of Chicago</p>
**COORDINATES:** < float > coordinates of the location where complaint was reported</p>
**YEAR:** < int > year</p>
**COMPLAINT_DETAIL:** < char > recorded complaint details, usually has a length < 100 </p>

#### 5) Concerns about the data

The database is huge, which brings difficulties of data cleaning and loading. 
The method to process complaint details is yet to be decided. 
The current information, though abundant, lacks more dimensions to present more diverse information on the environment of Chicago city. Some supplement data might be needed to build a more informative data visualization product. 


***This database is the primary source for my project***