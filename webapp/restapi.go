package main

import (
	ccore "eaciit/colony-core"

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
		Fields    []ccore.DataField
	}{}

	result := toolkit.NewResult()
	if e := ctx.GetPayload(&metadataRequestModel); e != nil {
		modelnameQuery := ctx.Query("modelname")
		if modelnameQuery == "" {
			return result.SetErrorTxt("Unable to get metadata: " + e.Error())
		}
		metadataRequestModel.ModelName = modelnameQuery
	}

	metadataResponseModel.ModelName = metadataRequestModel.ModelName

	result.SetData(&metadataResponseModel)

	return result
}
