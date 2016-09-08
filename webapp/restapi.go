package main

import (
	"eaciit/colony-core"
	"strings"

	"github.com/eaciit/knot/knot.v1"
	"github.com/eaciit/toolkit"
)

type RestAPI struct {
}

func (d *RestAPI) Index(ctx *knot.WebContext) interface{} {
	ctx.Config.OutputType = knot.OutputTemplate
	return nil
}

type MetadataField struct {
	ID             string
	DBFieldID      string
	Label          string
	FieldType      string
	ShowGrid       bool
	ShowGridColumn int
}

func DataField2MetadataField(fs []*clncore.DataField) []*MetadataField {
	ret := []*MetadataField{}

	showGridExist := false
	for _, f := range fs {
		mdf := new(MetadataField)
		mdf.ID = f.ID
		mdf.Label = f.Label
		mdf.FieldType = f.FieldType
		mdf.DBFieldID = f.Tag("bson")
		if mdf.DBFieldID == "" {
			mdf.DBFieldID = strings.ToLower(mdf.ID)
		}
		if mdf.Label == "" {
			mdf.Label = mdf.ID
		}

		gridcolumn := toolkit.ToInt(f.Tag("gridcolumn"), toolkit.RoundingAuto) - 1
		mdf.ShowGrid = gridcolumn >= 0
		mdf.ShowGridColumn = gridcolumn
		if gridcolumn > 0 {
			showGridExist = true
		}
		ret = append(ret, mdf)
	}

	if !showGridExist {
		for _, mdf := range ret {
			if mdf.ID == "ID" || mdf.ID == "Title" {
				mdf.ShowGrid = true
				mdf.ShowGridColumn = toolkit.IfEq(mdf.ID, "ID", 0, 1).(int)
			}
		}
	}
	return ret
}

func (d *RestAPI) Metadata(ctx *knot.WebContext) interface{} {
	ctx.Config.OutputType = knot.OutputJson

	metadataRequestModel := struct {
		ModelName string
	}{}

	metadataResponseModel := struct {
		ModelName string
		Fields    []*MetadataField
	}{}

	result := toolkit.NewResult()
	if e := ctx.GetPayload(&metadataRequestModel); e != nil {
		modelnameQuery := ctx.Query("modelname")
		if modelnameQuery == "" {
			return result.SetErrorTxt("Unable to get metadata: " + e.Error())
		}
		metadataRequestModel.ModelName = modelnameQuery
	}

	modelnameQuery := strings.ToLower(metadataRequestModel.ModelName)
	if modelnameQuery == "connection" {
		if model := cmm.Get("clncore.DataConnection"); model != nil {
			metadataResponseModel.Fields = DataField2MetadataField(model.FieldArray())
		}
	} else if modelnameQuery == "datamodel" {
		if model := cmm.Get("clncore.DataModel"); model != nil {
			metadataResponseModel.Fields = DataField2MetadataField(model.FieldArray())
		}
	}

	metadataResponseModel.ModelName = metadataRequestModel.ModelName

	result.SetData(&metadataResponseModel)

	return result
}

/*
func getFields(obj interface{}) []*ccore.DataField {
	var fields []*ccore.DataField

	rval := reflect.Indirect(reflect.ValueOf(obj))
	rtype := rval.Type()

	fieldCount := rtype.NumField()
	for fieldIdx := 0; fieldIdx < fieldCount; fieldIdx++ {
		fiter := rtype.FieldByIndex([]int{fieldIdx})
		fieldName := fiter.Name
		//fieldValue := rval.FieldByIndex([]int{fieldIdx})

		field := new(ccore.DataField)
		field.ID = fieldName
		field.FieldType = fiter.Type.String()
		field.FieldTag = string(fiter.Tag)
		fields = append(fields, field)
	}

	return fields
}
*/
