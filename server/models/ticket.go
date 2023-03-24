package models

import "time"

type Ticket struct {
	ID             int       `json:"id" gorm:"primary_key:auto_increment"`
	TrainName      string    `json:"train_name" gorm:"type:varchar(255)"`
	TrainType      string    `json:"train_type" gorm:"type:varchar(255)"`
	StartStation   Station   `gorm:"foreignKey:StartStationID"`
	StartStationID int       `sql:"type:bigint REFERENCES stations(id) ON UPDATE CASCADE ON DELETE RESTRICT" gorm:"uniqueIndex:idx_start_end_stations"`
	EndStation     Station   `gorm:"foreignKey:EndStationID"`
	EndStationID   int       `sql:"type:bigint REFERENCES stations(id) ON UPDATE CASCADE ON DELETE RESTRICT" gorm:"uniqueIndex:idx_start_end_stations"`
	StartDate      time.Time `json:"start_date"`
	StartTime      string    `json:"start_time"`
	ArrivalTime    string    `json:"arrival_time"`
	Price          int       `json:"price" gorm:"type: int" form:"price"`
	Stock          int       `json:"qty" gorm:"type: int" form:"qty"`
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
	Qty            int             `json:"qty,string,omitempty"`
	UserID         int             `json:"user_id"`
}

type TicketUserResponse struct {
	ID        int    `json:"id"`
	Fullname  string `json:"fullname"`
	StationID int    `json:"station_id"`
	Price     int    `json:"price"`
	Qty       int    `json:"qty"`
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

// type Ticket struct {
// 	ID                   int       `json:"id" gorm:"primary_key:auto_increment"`
// 	TrainName            string    `json:"train_name" gorm:"type: varchar(255)"`
// 	TrainType            string    `json:"train_type" gorm:"type: varchar(255)"`
// 	StartStationID       int       `json:"start_station_id" `
// 	DestinationStationID int       `json:"destination_station_id"`
// 	StartDate            time.Time `json:"start_date"`
// 	StartTime            time.Time `json:"start_time"`
// 	ArrivalTime          time.Time `json:"arrival_time"`
// 	Price                int       `json:"price" gorm:"type: int"`
// 	Stock                int       `json:"qty" gorm:"type: int"`
// }
