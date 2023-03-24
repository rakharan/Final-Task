package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	FindAllTickets() ([]models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	GetTicket(ID int) (models.Ticket, error)
	CreateTransactionQty(transaction models.Transaction) (models.Transaction, error)
}

func RepositoryTicket(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindAllTickets() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("StartStation").Preload("EndStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Save(&ticket).Error
	return ticket, err
}

func (r *repository) GetTicket(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("EndStation").First(&ticket, "id = ?", ID).Error

	return ticket, err
}

func (r *repository) CreateTransactionQty(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error
	return transaction, err
}
