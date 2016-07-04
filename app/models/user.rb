class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, length: { minimum: 4, maximum: 20 }, uniqueness: true
  validates :display_name, presence: true, length: { minimum: 4, maximum: 20 }, uniqueness: true

  def email_required?
    false
  end

  def email_changed?
    false
  end

end
