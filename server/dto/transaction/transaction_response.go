package transactiondto

import (
	"landtick/models"
	"time"
)

type TransactionResponse struct {
	ID            int                         `json:"id" gorm:"primary_key:auto_increment"`
	TransactionID int                         `json:"transaction_id" `
	UserID        int                         `json:"user_id"`
	User          models.UsersProfileResponse `json:"user"`
	TicketID      int                         `json:"ticket_id"`
	Ticket        models.TicketResponse       `json:"ticket"`
	Status        string                      `json:"status"`
	CreatedAt     time.Time                   `json:"-"`
	UpdatedAt     time.Time                   `json:"-"`
}
