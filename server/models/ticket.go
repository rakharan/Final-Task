package models

import "time"

type Ticket struct {
	ID             int       `json:"id" gorm:"primary_key"`
	TrainName      string    `json:"train_name" gorm:"type:varchar(255)"`
	TrainType      string    `json:"train_type" gorm:"type:varchar(255)"`
	StartStation   Station   `gorm:"foreignKey:StartStationID"`
	StartStationID int       `sql:"type:bigint REFERENCES stations(id) ON UPDATE CASCADE ON DELETE RESTRICT" gorm:"uniqueIndex:idx_start_end_stations"`
	EndStation     Station   `gorm:"foreignKey:EndStationID"`
	EndStationID   int       `sql:"type:bigint REFERENCES stations(id) ON UPDATE CASCADE ON DELETE RESTRICT" gorm:"uniqueIndex:idx_start_end_stations"`
	StartDate      time.Time `json:"start_date"`
	StartTime      string    `json:"start_time"`
	ArrivalTime    string    `json:"arrival_time"`
	Price          int       `json:"price" gorm:"type:int" form:"price"`
	Stock          int       `json:"stock" gorm:"type:int" form:"stock"`
	UserID         int       `json:"user_id"`
	CreatedAt      time.Time `json:"-"`
	UpdatedAt      time.Time `json:"-"`
}

type TicketResponse struct {
	ID             int             `json:"id"`
	TrainName      string          `json:"train_name"`
	TrainType      string          `json:"train_type"`
	StartStationID int             `json:"start_station_id,string,omitempty"`
	StartStation   StationResponse `json:"start_station"`
	StartDate      string          `json:"start_date"`
	StartTime      string          `json:"start_time"`
	ArrivalTime    string          `json:"arrival_time"`
	EndStationID   int             `json:"destination_station_id,string,omitempty"`
	EndStation     StationResponse `json:"destination_station"`
	Price          int             `json:"price,string,omitempty"`
	Stock          int             `json:"stock,string,omitempty"`
	UserID         int             `json:"user_id"`
}

type TicketUserResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	StationID int    `json:"station_id"`
	Price     int    `json:"price"`
	Stock     int    `json:"stock"`
}

func (Ticket) TableName() string {
	return "tickets"
}

func (TicketResponse) TableName() string {
	return "tickets"
}

func (TicketUserResponse) TableName() string {
	return "tickets"
}
