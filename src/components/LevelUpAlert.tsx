import Card from "./card";

export default function LevelUpAlert({showLevelUp, level}: {showLevelUp: boolean, level: number}) {
  return (
    <div>
        {/* Level Up Animation */}
        {showLevelUp && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-6 flex justify-center w-full pointer-events-none animate-bounceIn">
          <div className="pointer-events-auto">
            <Card
              header={
                <span className="text-3xl text-success font-extrabold">
                  LEVEL UP!
                </span>
              }
              className="w-[20rem] px-4 py-2 border-success border-4"
            >
              <div className="text-xl font-bold text-success mb-2 text-center">
                Welcome to Level {level + 1}!
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
