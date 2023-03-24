package ticketdto

import "time"

type TicketRequest struct {
	ID                   int       `json:"-" gorm:"primary_key:auto_increment"`
	TrainName            string    `json:"train_name" gorm:"type: varchar(255)" form:"train_name"`
	TrainType            string    `json:"train_type" gorm:"type: varchar(255)" form:"train_type"`
	StartStationID       int       `json:"start_station_id"  form:"start_station_id"`
	DestinationStationID int       `json:"destination_station_id" form:"destination_station_id"`
	StartDate            time.Time `json:"start_date" form:"start_date"`
	StartTime            string    `json:"start_time" form:"start_time"`
	ArrivalTime          string    `json:"arrival_time" form:"arrival_time"`
	Price                int       `json:"price" gorm:"type: int" form:"price"`
	Stock                int       `json:"qty" gorm:"type: int" form:"stock"`
}

type TransTicket struct {
	Qty int `json:"qty" form:"qty"`
}
