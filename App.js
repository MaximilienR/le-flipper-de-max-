import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

const Ball = ({ position }) => {
  return (
    <View style={[styles.ball, { top: position.y, left: position.x }]} />
  );
};

const Physics = (entities, { time }) => {
  let ball = entities.ball;

  const gravity = 1; // pixels par frame
  const floorY = 800;

  // Appliquer gravité sur la vitesse verticale
  ball.velocityY += gravity;

  // Appliquer la vitesse sur la position
  ball.position.y += ball.velocityY;

  // Empêcher la balle de descendre sous le sol
  if (ball.position.y > floorY) {
    ball.position.y = floorY;
    ball.velocityY = 0; // Stopper la vitesse pour qu'elle reste sur le sol
  }

  // Mettre à jour le renderer avec la nouvelle position
  ball.renderer = <Ball position={{ x: ball.position.x, y: ball.position.y }} />;

  return entities;
};

export default function App() {
  const initialX = 200;
  const initialY = 50;

  const [entities, setEntities] = useState({
    ball: {
      position: { x: initialX, y: initialY },
      velocityY: 0,
      renderer: <Ball position={{ x: initialX, y: initialY }} />,
    },
  });

  // États pour savoir si les boutons sont "pressés"
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  // Fonction pour "taper" sur la balle et lui donner une vitesse vers le haut
  const tapFlipper = () => {
    setEntities((prev) => {
      if (prev.ball.position.y >= 800) {
        return {
          ...prev,
          ball: {
            ...prev.ball,
            velocityY: -20,
          },
        };
      }
      return prev;
    });
  };

  // Gestion appui bouton gauche
  const onLeftPress = () => {
    setLeftPressed(true);
    tapFlipper();
    setTimeout(() => setLeftPressed(false), 300); // remet à 0 la rotation après 300ms
  };

  // Gestion appui bouton droit
  const onRightPress = () => {
    setRightPressed(true);
    tapFlipper();
    setTimeout(() => setRightPressed(false), 300);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        style={styles.gameContainer}
        systems={[Physics]}
        entities={entities}
        onUpdate={(entities) => setEntities({ ...entities })}
      >
        <Text style={styles.title}>Le flipper de Max</Text>

        <View style={styles.circlesContainer}>
          <View style={[styles.circle, styles.topCircle]} />
          <View style={[styles.circle, styles.leftCircle]} />
          <View style={[styles.circle, styles.rightCircle]} />
        </View>
      </GameEngine>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftFlipper,
            leftPressed && { transform: [{ rotate: '0deg' }] }, // rotation quand pressé
          ]}
          onPress={onLeftPress}
        >
          <Text style={styles.buttonText}>Flipper Gauche</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.rightFlipper,
            rightPressed && { transform: [{ rotate: '0deg' }] },
          ]}
          onPress={onRightPress}
        >
          <Text style={styles.buttonText}>Flipper Droit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#001f3f', 
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gameContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  circlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
  },
  topCircle: {
    top: 0,
  },
  leftCircle: {
    top: 80,
    left: '15%',
  },
  rightCircle: {
    top: 80,
    right: '15%',
  },
  ball: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    borderRadius: 5,
    transformOrigin: 'bottom center', // optionnel pour mieux pivoter par la base
  },
  leftFlipper: {
    transform: [{ rotate: '20deg' }],
  },
  rightFlipper: {
    transform: [{ rotate: '-20deg' }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
