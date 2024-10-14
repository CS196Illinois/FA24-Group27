# API KEY: AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc

API_KEY = 'AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc'
import gmplot
from IPython.display import display
import pprint
import gmaps
import gmaps.datasets
import gmplot
import ipywidgets as widgets

widgets.IntSlider()
gmaps.configure(api_key='AIzaSyA-BwM2vuDoiNikvMzcNW68WwHuDIQkhXc')

earthquake_df = gmaps.datasets.load_dataset_as_df('earthquakes')
earthquake_df.head()
locations = earthquake_df[['latitude','longitude']]
weights = earthquake_df ['magnitude']
fig = gmaps.figure()
fig.add_layer(gmaps.heatmap_layer(locations, weights = weights))
fig