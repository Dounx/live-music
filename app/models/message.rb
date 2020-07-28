# frozen_string_literal: true

class Message < ApplicationRecord
  after_commit :deliver

  class << self
    def build(attributes = nil)
      attributes &&= format(attributes)
      new(attributes)
    end

    private

    def format(attributes)
      {
        action: attributes[:action],
        from_class: attributes[:from]&.class&.name,
        from_id: attributes[:from]&.id,
        to_class: attributes[:to]&.class&.name,
        to_id: attributes[:to]&.id,
        data: attributes[:data].to_json
      }
    end
  end

  # def from
  #   klass = from_class
  #   klass.find_by(id: from_id)
  # end
  # Same as #to method
  %i[from to].each do |name|
    define_method(name) do
      klass = public_send("#{name}_class").constantize
      klass.find_by(id: public_send("#{name}_id"))
    end
  end

  def broadcast
    channel.broadcast_to(to, self)
  end

  def channel
    klass = self.class.name
    type = klass.delete('Message')
    "#{type}sChannel".constantize
  end

  def deliver
    MessageJob.perform_later(self)
  end
end
