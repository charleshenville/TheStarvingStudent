import numpy as np
import openpyxl as op
import pandas as pd
import json as j

def createItemTypes():

    itemtypecd = pd.read_excel(modelpath,index_col='Item Code', sheet_name = 'ItemCode List')
    
    jsonstring = itemtypecd.to_json(orient = 'index')
    variableparse = j.loads(jsonstring)
    finalstring = j.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'itemtypecodes.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()
    
def createUIretreivables():

    uiretr = pd.read_excel(modelpath,index_col='Restaurant Name', sheet_name = 'Main')
    
    uiretr.reset_index(inplace = True)

    for i in uiretr.index:
        uiretrsplit = uiretr.loc[i, 'Restaurant Name']
        uiretrsplititerated = uiretrsplit.split(' @ ')
        uiretrwithdash = uiretrsplit.replace('@','-')
        # print(uiretrsplititerated)
        
        uiretr['Restaurant Name'][i] = uiretrwithdash
        uiretr['Address'][i] = uiretrsplititerated[1]

    uiretr.set_index('Restaurant Name', inplace = True)
    jsonstring = uiretr.to_json(orient = 'index')
    variableparse = j.loads(jsonstring)
    finalstring = j.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'uiretreivable.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()

def createRestautantTypes():

    restautanttypecd = pd.read_excel(modelpath,index_col='Restaurant Code', sheet_name = 'RestaurantCode List')
    
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

    

    restautanttypecd.set_index('Restaurant Code', inplace = True)
    jsonstring = restautanttypecd.to_json(orient = 'index')
    variableparse = j.loads(jsonstring)
    finalstring = j.dumps(variableparse, indent = 4)

    itemtypecdjson = open(jsonpath+'restautanttypecodes.json', 'w')
    itemtypecdjson.write(finalstring)
    itemtypecdjson.close()

jsonpath = './form-configs/'
modelpath = './models/StarvingStudent_DataModel.xlsx'

createItemTypes()
createRestautantTypes()
createUIretreivables()
