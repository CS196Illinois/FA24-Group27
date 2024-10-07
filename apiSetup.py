
# API KEY: AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc
import googlemaps
from pprint import pprint 
import win32com.client as win32
import os
API_KEY = 'AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc'

map_client = googlemaps.Client(API_KEY)

def get_place_info(location_name):
    try:
        #location_name = "Campus Instructional Facility"
        resp = map_client.places(query=location_name)
        results = resp.get('results')[0]
        return results
    except Exception as e:
        print(e)
        return None

    
xlApp = win32.Dispatch('Excel.Application')
xlApp.Visible = True
wb = xlApp.workbooks.open(os.path.join(os.getcwd(),"Location_List_Samples.xlsx"))
wsList = wb.Worksheets("Sheet1")
LastRow = wsList.Cells(wsList.Rows.Count, 'A').End(-4162).Row

for i in range(2, LastRow + 1):
    place_info = get_place_info(wsList.Cells(i,1).Value)
    wsList.cells(i,2).Value = place_info['name'] 
    wsList.cells(i,3).Value = place_info['formatted_address'] 
    wsList.cells(i,4).Value = place_info['place_id'] 
    wsList.cells(i,5).Value = place_info['rating'] 
    #wsList.cells(i,6).Value = place_info['user_rating_total'] 
    

# location_name = "Campus Instructional Facility"
# response0 = map_client.places(query=location_name)
# #pprint(response0)
# results = response0.get('results')
# results[0]['business_status']
# # results[0]['formatted address']
# results[0]['place_id']
# results[0]['name']
# results[0]['rating']
# results[0]['user_ratings_total']

#pprint(results)

#Location Databasse

dorm_address = "604 E Armory Ave, Champaign, IL"

response  = map_client.geocode(dorm_address)

#pprint(response)

#print(response[0]["geometry"])

cif_address = "Campus Instructional Facility, Champaign, Il"
#pprint(map_client.geocode(cif_address))

crce_address = "Campus Recreation Center East, Champaign, Il"
#pprint(map_client.geocode(crce_address))

siebel_address = "Siebel Center for Design, Champaign, Il"
#pprint(map_client.geocode(siebel_address))

isr_address = "Illinois Street Residence Halls, Champaign, IL"
#pprint(map_client.geocode(isr_address))