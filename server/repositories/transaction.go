package repositories

import (
	"landtick/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)
	GetTicketById(ID int) (models.Ticket, error)
	GetTicketTransaction(UserID int) ([]models.Transaction, error)
	CreateTransaction(trans models.Transaction) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	GetTransUser(UserID int) (models.Transaction, error)
	GetOneTransaction(ID string) (models.Transaction, error)
	Payment(payment models.Transaction) (models.Transaction, error)
	GetPaymentByIdTrans(ID int) (models.Transaction, error)
	UpdateTransaction(status string, ID string) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket.StartStation").Preload("Ticket.EndStation").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTicketById(ID int) (models.Ticket, error) {
	var ticket models.Ticket
	err := r.db.Preload("StartStation").Preload("EndStation").First(&ticket, "id = ?", ID).Error

	return ticket, err
}

func (r *repository) CreateTransaction(trans models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("Ticket.StartStation").Preload("Ticket.EndStation").Create(&trans).Error

	return trans, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Ticket.StartStation").Preload("Ticket.EndStation").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetTransUser(UserID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Ticket.StartStation").Preload("Ticket.EndStation").Where("user = ?", UserID).Where("status = ?").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTicketTransaction(UserID int) ([]models.Transaction, error) {
	var transaction []models.Transaction

	err := r.db.Preload("User").Preload("Ticket.StartStation").Preload("Ticket.EndStation").Where("user_id = ?", UserID).Find(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID string) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Ticket").First(&transaction, ID)

	// if status != transaction.Status && status == "success" {
	// 	var ticket models.Ticket
	// 	r.db.First(&ticket, transaction.Ticket.ID)
	// 	ticket.Stock = ticket.Stock - 1
	// 	r.db.Save(&ticket)
	// }

	transaction.Status = status
	error := r.db.Save(&transaction).Error
	return transaction, error
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Ticket").Preload("Ticket.User").Preload("User").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) Payment(payment models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&payment).Error
	return payment, err
}

func (r *repository) GetPaymentByIdTrans(ID int) (models.Transaction, error) {
	var payment models.Transaction
	err := r.db.Preload("Ticket").Where("transaction_id = ?", ID).Find(&payment).Error

	return payment, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}
