# Monoamp-Repo

MadAmp - Monoprice Audio Distribution Amp
=========================================

  Control a Monoprice 6 zone Audio Distribution Amp using a phone or tablet via wifi connection. Use the device browser to access the Apache Server. Target board for this software is an UDOO Neo. Although the program will work on any Linux device that has an RS232 port which must be connected to the Distribution Amp RS232 control port.
 
Audio Amp Front View
--------------------
![](/images/Audio_Amp_Frontview_sm.jpg)

  
Audio Amp Rear View
-------------------
![](/images/Audio_Amp_rearview_sm.jpg)


Browser View of Control Panel
-----------------------------
![](/images/MadAmp_Browser_View_sm.jpg)


Software Installation Required
------------------------------
* Apache Server
* PHP
* mySQL Database

  Instructions for installation of these programs on UDOO Neo can be found at this link.
  
  (http://www.udoo.org/tutorial/udoo-web-server/)

  Program also requires creation of madAmp database. Use Phpmyadmin to create the databases and import the sql files from the Data folder to populate the databases.
  
  Database - madAmp - import file /Data/madAmp.sql
  Database - rs232sim - import file /Data/rs232sim.sql

Additional Software Required
----------------------------
  
* Python mysqldb 

  Install as follows: 
  
  sudo apt-get install python-mysqldb
  
  
  






