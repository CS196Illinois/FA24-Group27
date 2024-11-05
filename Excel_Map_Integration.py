import gmplot
import googlemaps
import win32com.client as win32
import os
from pprint import pprint
from flask import Flask, render_template
import shutil

apikey = 'AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc'
map_client = googlemaps.Client(apikey)

def get_coordinates(address):
    try:
        response = map_client.geocode(address)
        if response:
            location = response[0]["geometry"]['location']
            return location['lat'], location['lng']
        else:
            print(f"Could not geocode address: {address}")
            return None, None
    except Exception as e:
        print(f"Error: {e}")
        return None, None

def get_place_info(location_name):
    try:
        resp = map_client.places(query=location_name)
        results = resp.get('results')[0]
        return results
    except Exception as e:
        print(e)
        return None

def get_route_duration(origin, destination):
    try:
        directions = map_client.directions(origin, destination, mode="driving")
        if directions:
            duration = directions[0]['legs'][0]['duration']['text']
            return duration
        else:
            print(f"Could not get route from {origin} to {destination}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

# Set up Excel application and open workbook
xlApp = win32.Dispatch('Excel.Application')
xlApp.Visible = True
wb = xlApp.workbooks.open(os.path.join(os.getcwd(), "Location_List_Samples.xlsx"))
wsList = wb.Worksheets("Sheet1")
LastRow = wsList.Cells(wsList.Rows.Count, 'A').End(-4162).Row

# Get information for the first location (origin)
origin_place = get_place_info(wsList.Cells(2, 1).Value)
if origin_place:
    wsList.Cells(2, 2).Value = origin_place['name']
    wsList.Cells(2, 3).Value = origin_place['formatted_address']
    wsList.Cells(2, 4).Value = origin_place['place_id']
    origin_address = origin_place['formatted_address']
else:
    origin_address = None

# Process each destination row to retrieve place information and calculate route duration
for i in range(3, LastRow + 1):
    place_info = get_place_info(wsList.Cells(i, 1).Value)
    if place_info:
        wsList.Cells(i, 2).Value = place_info['name']
        wsList.Cells(i, 3).Value = place_info['formatted_address']
        wsList.Cells(i, 4).Value = place_info['place_id']
        if origin_address:
            duration = get_route_duration(origin_address, place_info['formatted_address'])
            wsList.Cells(i, 5).Value = duration

# Collect addresses for geocoding
addresses = [wsList.Cells(i, 3).Value for i in range(2, LastRow + 1) if wsList.Cells(i, 3).Value]

# Geocode addresses to get coordinates for map plotting
coordinates = []
for address in addresses:
    lat, lng = get_coordinates(address)
    if lat and lng:
        coordinates.append((lat, lng))

# Print the coordinates for verification
pprint(coordinates)

# Generate the map if there are any valid coordinates
if coordinates:
    gmap = gmplot.GoogleMapPlotter(coordinates[0][0], coordinates[0][1], 14, apikey=apikey)

    # Mark each location on the map
    for lat, lng in coordinates:
        gmap.marker(lat, lng, color='cornflowerblue')

    # Scatter locations on the map
    lats, lngs = zip(*coordinates)
    gmap.scatter(lats, lngs, color='red', size=40, marker=False)

    # Draw routes from the first location to each other location with green lines
    origin_lat, origin_lng = coordinates[0]
    for dest_lat, dest_lng in coordinates[1:]:
        # Draw green line for routes from the origin
        gmap.plot([origin_lat, dest_lat], [origin_lng, dest_lng], color='green', edge_width=5)

    # Draw polygon around all points if more than 2 locations exist
    if len(coordinates) > 2:
        gmap.polygon(lats, lngs, color='cornflowerblue', edge_width=10)

    # Save the generated map to an HTML file
    gmap.draw('uiucmap_dynamic.html')
else:
    print("No valid coordinates found.")

# Set up Flask app to serve the map
app = Flask(__name__)

@app.route('/')
def uiuc_map():
    return render_template('uiucmap_dynamic.html')

# Ensure the templates folder exists and copy the map HTML file there if needed
template_folder = os.path.join(os.getcwd(), 'templates')
if not os.path.exists(template_folder):
    os.makedirs(template_folder)

current_dir_map_path = os.path.join(os.getcwd(), 'uiucmap_dynamic.html')
template_dir_map_path = os.path.join(template_folder, 'uiucmap_dynamic.html')

if os.path.exists(current_dir_map_path):
    if not os.path.exists(template_dir_map_path) or \
       os.path.getmtime(current_dir_map_path) > os.path.getmtime(template_dir_map_path):
        shutil.copy2(current_dir_map_path, template_dir_map_path)

if __name__ == '__main__':
    app.run(debug=True)


