package main

import (
	"github.com/eaciit/knot/knot.v1"
)

type DataManager struct {
}

func (d *DataManager) Index(ctx *knot.WebContext) interface{} {
	ctx.Config.OutputType = knot.OutputTemplate
	return struct{}{}
}
