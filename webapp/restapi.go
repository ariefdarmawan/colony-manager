package main

import (
	ccore "eaciit/colony-core"

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

func (d *RestAPI) Metadata(ctx *knot.WebContext) interface{} {
	ctx.Config.OutputType = knot.OutputJson

	metadataRequestModel := struct {
		ModelName string
	}{}

	metadataResponseModel := struct {
		ModelName string
		Fields    []*ccore.DataField
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
	if modelnameQuery == "datamodel" {
		if model := cmm.Get("clncore.DataModel"); model != nil {
			metadataResponseModel.Fields = model.FieldArray()
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
