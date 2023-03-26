package models

import "time"

type Transaction struct {
	ID            int                  `json:"id" gorm:"primary_key"`
	TransactionID int                  `json:"transaction_id"`
	UserID        int                  `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User          UsersProfileResponse `json:"user"`
	TicketID      int                  `json:"ticket_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Ticket        TicketResponse       `json:"ticket"`
	Total         int                  `json:"total" form:"total"`
	Stock         int                  `json:"stock" form:"stock"`
	Status        string               `json:"status" gorm:"type: varchar(255)"`
	CreatedAt     time.Time            `json:"-"`
	UpdatedAt     time.Time            `json:"-"`
}
