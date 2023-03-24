package models

type Station struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Name string `json:"name" gorm:"type: varchar(255)"`
	City string `json:"city" gorm:"type: varchar(255)"`
}
type StationResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	City string `json:"city"`
}

func (Station) TableName() string {
	return "stations"
}

func (StationResponse) TableName() string {
	return "stations"
}
