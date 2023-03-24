package stationdto

type CreateStationRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
	City string `json:"city" form:"city" gorm:"type: varchar(255)" validate:"required"`
}

type UpdateStationRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
	City string `json:"city" form:"city" gorm:"type: varchar(255)"`
}
