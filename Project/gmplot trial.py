import gmplot
import googlemaps
from pprint import pprint

# Create the map plotter:
apikey = 'AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc' 

map_client = googlemaps.Client(apikey)

def get_place_info(location_name):
    try:
        #location_name = "Campus Instructional Facility"
        resp = map_client.places(query=location_name)
        results = resp.get('results')[0]
        return results
    except Exception as e:
        print(e)
        return None

dorm_address = "604 E Armory Ave, Champaign, IL"

response  = map_client.geocode(dorm_address)

#pprint(response)
pprint(response[0]["geometry"]['location']['lat'])
pprint(response[0]["geometry"]['location']['lng'])

gmap = gmplot.GoogleMapPlotter(40.1019523, -88.2271615, 14, apikey=apikey)

# Mark Newman Hall:
gmap.marker(response[0]["geometry"]['location']['lat'], response[0]["geometry"]['location']['lng'], color='cornflowerblue')

# Highlight some attractions:
attractions_lats, attractions_lngs = zip(*[
    (40.1019523, -88.2271615),
    (40.1124436, -88.22834189999999),
    (40.1047425, -88.2219207),
    (40.1026852, -88.23278069999999),
    (40.1101128, -88.22173529999999)
])
gmap.scatter(attractions_lats, attractions_lngs, color='red', size=40, marker=False)

# Outline the Golden Gate Park:
basic_polygon = zip(*[
    (40.1019523, -88.2271615),
    (40.1026852, -88.23278069999999),
    (40.1124436, -88.22834189999999),
    (40.1101128, -88.22173529999999),
    (40.1047425, -88.2219207)
])
gmap.polygon(*basic_polygon, color='cornflowerblue', edge_width=10)

# Draw the map to an HTML file:
gmap.draw('uiucmap.html')
