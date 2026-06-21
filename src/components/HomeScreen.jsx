import { Heart, Moon, Plus, Sparkles, Sun, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

export default function HomeScreen({
  beers,
  onAddBeer,
  onClearBeers,
  onDeleteBeer,
  darkMode,
  onToggleDarkMode,
  onGoToDonation,
}) {
  const [name, setName] = useState("");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");

  // Predefined volumes for quick entry
  const commonVolumes = [190, 300, 330, 350, 355, 473, 600, 1000];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!volume || !price) return;

    const volNum = parseFloat(volume);
    const priceNum = parseFloat(price);

    if (volNum > 0 && priceNum > 0) {
      onAddBeer({
        id: Date.now().toString(),
        name: name.trim() || `Cerveja ${volNum}ml`,
        volume: volNum,
        price: priceNum,
        pricePerLiter: priceNum / (volNum / 1000),
      });

      // Clear input fields
      setName("");
      setVolume("");
      setPrice("");
    }
  };

  // Sort beers from cheapest per liter to most expensive
  const sortedBeers = useMemo(() => {
    return [...beers].sort((a, b) => a.pricePerLiter - b.pricePerLiter);
  }, [beers]);

  return (
    <div className="home-container">
      {/* Top Navbar */}
      <header className="navbar glass-panel">
        <div className="nav-brand">
          <span className="beer-emoji">🍻</span>
          <h1>CalculaBreja</h1>
        </div>
        <div className="nav-actions">
          <button
            className="btn-theme"
            onClick={onToggleDarkMode}
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="btn-donation-trigger"
            onClick={onGoToDonation}
            title="Doe uma cerveja"
          >
            <Heart size={20} fill="currentColor" />
            <span>Apoiar</span>
          </button>
        </div>
      </header>

      {/* Main input form */}
      <section className="form-section glass-panel">
        <form onSubmit={handleAdd} className="beer-form">
          <div className="input-group">
            <label htmlFor="beer-name">
              Nome / Marca <span className="optional">(Opcional)</span>
            </label>
            <input
              type="text"
              id="beer-name"
              placeholder="Ex: Heineken, Brahma..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="custom-input"
            />
          </div>

          <div className="input-row">
            <div className="input-group flex-1">
              <label htmlFor="beer-volume">Volume (ml)</label>
              <input
                type="number"
                id="beer-volume"
                placeholder="Ex: 350, 473"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
                min="1"
                className="custom-input"
              />
            </div>

            <div className="input-group flex-1">
              <label htmlFor="beer-price">Preço (R$)</label>
              <input
                type="number"
                id="beer-price"
                placeholder="Ex: 4.50"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0.01"
                step="0.01"
                className="custom-input"
              />
            </div>
          </div>

          {/* Quick volume suggestions */}
          <div className="quick-volumes">
            {commonVolumes.map((vol) => (
              <button
                key={vol}
                type="button"
                className="btn-quick-vol"
                onClick={() => setVolume(vol.toString())}
              >
                {vol} ml
              </button>
            ))}
          </div>

          <button type="submit" className="btn-primary w-full mt-4">
            <Plus size={20} />
            <span>Adicionar à Comparação</span>
          </button>
        </form>
      </section>

      {/* Comparison List */}
      <section className="list-section">
        <div className="list-header">
          <h2>Lista de Comparação</h2>
          {beers.length > 0 && (
            <button className="btn-clear" onClick={onClearBeers}>
              <Trash2 size={16} />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {sortedBeers.length === 0 ? (
          <div className="empty-state glass-panel">
            <Sparkles className="empty-icon" size={48} />
            <p>Nenhuma cerveja adicionada.</p>
            <p className="subtext">
              Insira o volume e o preço acima para começar a comparar.
            </p>
          </div>
        ) : (
          <div className="beers-list">
            {sortedBeers.map((beer, index) => {
              const isCheapest = index === 0;
              const isMostExpensive =
                index === sortedBeers.length - 1 && sortedBeers.length > 1;

              // Calculate percent difference compared to cheapest
              const diffPercent = isCheapest
                ? 0
                : ((beer.pricePerLiter - sortedBeers[0].pricePerLiter) /
                    sortedBeers[0].pricePerLiter) *
                  100;

              return (
                <div
                  key={beer.id}
                  className={`beer-item glass-panel ${isCheapest ? "cheapest" : ""}`}
                >
                  <div className="beer-item-details">
                    <div className="beer-title-row">
                      <span className="beer-name">{beer.name}</span>
                      {isCheapest && (
                        <span className="badge cheapest-badge">Campeã 🏆</span>
                      )}
                    </div>

                    <div className="beer-numbers">
                      <span>
                        {beer.volume} ml • R$ {beer.price.toFixed(2)}
                      </span>
                      {!isCheapest && sortedBeers.length > 1 && (
                        <span className="diff-badge">
                          +{diffPercent.toFixed(0)}% mais cara
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="beer-item-price-col">
                    <div className="price-per-liter">
                      R$ {beer.pricePerLiter.toFixed(2)}
                      <span className="unit">/L</span>
                    </div>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteBeer(beer.id)}
                      aria-label={`Excluir ${beer.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        .home-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 16px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: fadeIn 0.4s ease-out;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          border-radius: 16px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-brand h1 {
          font-size: 1.4rem;
          margin: 0;
          background: linear-gradient(135deg, var(--primary) 0%, #b45309 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .beer-emoji {
          font-size: 1.5rem;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-theme {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-primary);
          padding: 8px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast), border-color var(--transition-fast);
        }

        .btn-theme:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
        }

        .btn-donation-trigger {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #ffffff;
          border: none;
          padding: 8px 14px;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .btn-donation-trigger:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(239, 68, 68, 0.3);
        }

        .form-section {
          padding: 20px;
          border-radius: 20px;
        }

        .beer-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .optional {
          font-size: 0.75rem;
          font-weight: 400;
          color: var(--text-muted);
        }

        .input-row {
          display: flex;
          gap: 12px;
        }

        .flex-1 {
          flex: 1;
        }

        .w-full {
          width: 100%;
        }

        .mt-4 {
          margin-top: 16px;
        }

        .quick-volumes {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .btn-quick-vol {
          background-color: var(--bg-primary);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-quick-vol:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .list-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 4px;
        }

        .list-header h2 {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .btn-clear {
          display: flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: var(--warning);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background-color var(--transition-fast);
        }

        .btn-clear:hover {
          background-color: var(--warning-light);
        }

        .empty-state {
          padding: 40px 20px;
          text-align: center;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .empty-icon {
          color: var(--primary);
          margin-bottom: 8px;
          opacity: 0.7;
        }

        .subtext {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .beers-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .beer-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .beer-item.cheapest {
          border-left: 5px solid var(--accent);
          background: linear-gradient(90deg, var(--accent-light) 0%, var(--card-bg) 100%);
        }

        .beer-item-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .beer-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .beer-name {
          font-weight: 600;
          font-size: 1rem;
        }

        .badge {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .cheapest-badge {
          background-color: var(--accent);
          color: #ffffff;
        }

        .beer-numbers {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .diff-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--warning);
          background-color: var(--warning-light);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .beer-item-price-col {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .price-per-liter {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .price-per-liter .unit {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .btn-delete {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .btn-delete:hover {
          color: var(--warning);
          background-color: var(--warning-light);
        }
      `}</style>
    </div>
  );
}
