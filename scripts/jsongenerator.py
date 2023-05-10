# import numpy as np
# import openpyxl as op
import pandas as pd
import json

def createItemTypes():

    itemtypecd = pd.read_excel(modelpath,index_col='Item Type', sheet_name = 'ItemCode List')
    
    jsonstring = itemtypecd.to_json(orient = 'index')
    variableparse = json.loads(jsonstring)
    finalstring = json.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'itemtypecodes.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()
    
def createUIretreivables():

    uiretr = pd.read_excel(modelpath, index_col='RestaurantName', sheet_name = 'Main')
    
    uiretr.reset_index(inplace = True)

    for i in uiretr.index:
        uiretrsplit = uiretr.loc[i, 'RestaurantName']
        uiretrsplititerated = uiretrsplit.split(' @ ')
        
        uiretr['Name'][i] = uiretrsplititerated[0]
        #print(uiretrsplititerated)
        uiretr['Address'][i] = uiretrsplititerated[1]

    uiretr.set_index('RestaurantName', inplace = True)

    jsonstring = uiretr.to_json(orient = 'index')
    variableparse = json.loads(jsonstring)
    finalstring = json.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'uiretreivable.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()

def createRestautantTypes():

    restautanttypecd = pd.read_excel(modelpath,index_col='Restaurant Name', sheet_name = 'RestaurantCode List')
    
    restautanttypecd.reset_index(inplace = True)

    for i in restautanttypecd.index:
        uiretrsplit = restautanttypecd.loc[i, 'ItemTypeCode']
        
        dietrestrsplit = restautanttypecd.loc[i, 'Dietary Restriction/Accomodation']
        
        if str(uiretrsplit)!='nan':
            uiretrsplititerated = uiretrsplit.split(', ')
            # print(uiretrsplititerated)
        else:
            uiretrsplititerated = uiretrsplit

        if str(dietrestrsplit)!='nan':
            dietrestrsplititerated = dietrestrsplit.split(', ')
            # print(dietrestrsplititerated)
        else:
            dietrestrsplititerated = dietrestrsplit
        
        restautanttypecd['ItemTypeCode'][i] = uiretrsplititerated
        restautanttypecd['Dietary Restriction/Accomodation'][i] = dietrestrsplititerated

    restautanttypecd.set_index('Restaurant Name', inplace = True)
    jsonstring = restautanttypecd.to_json(orient = 'index')
    variableparse = json.loads(jsonstring)
    finalstring = json.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'restauranttypecodes.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()

jsonpath = './public/form-configs/'
modelpath = './models/StarvingStudent_DataModel.xlsx'

createItemTypes()
createRestautantTypes()
createUIretreivables()

